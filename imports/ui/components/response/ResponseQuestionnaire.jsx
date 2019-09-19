import { Dialog, DialogContent, Grid, GridCell, Typography } from 'rmwc'
import { FileList } from '/imports/ui/components/FileList.jsx'
import React, { useState } from 'react'
import { prepareResponseView } from './ResponseCommon.jsx'
import { Redirect } from 'react-router-dom'
import { ResponseAnswer } from './ResponseAnswer.jsx'
import { ResponseQuestion } from './ResponseQuestion.jsx'
import { ResponseSave } from '/imports/methods/Response.js'
import { StickyNav } from '../Forms.jsx'
import { BigButton as Button } from '/imports/ui/components/Forms.jsx'
import styled from 'styled-components'

const StyledGridCell = styled(GridCell)`
    background: white;
`
const DialogParagraph = ({ children }) => (
    <Typography tag='p' use='headline6'>
        {children}
    </Typography>
)

const FTUDialog = ({ dialogOpen, setDialogOpen }) => {
    return (
        <Dialog
            open={dialogOpen}
            className='responseFTU'
            onClose={() => setDialogOpen(false)}>
            <DialogContent>
                <DialogParagraph>
                    You can simply view this filmstrip by clicking the &lt; and
                    &gt; buttons.
                </DialogParagraph>
                <DialogParagraph>
                    Or you can respond to each frame by recording a video
                    response, adding links, and uploading files.
                </DialogParagraph>
                <Button label='Ok' onClick={() => setDialogOpen(false)} />
            </DialogContent>
        </Dialog>
    )
}

export const ResponseQuestionnaire = prepareResponseView(
    ({
        t,
        filmstrip,
        frame,
        email,
        emailBase64,
        currentFrameIndex,
        history
    }) => {
        const [toFinish, goToFinish] = useState(false)
        const [toNextFrame, goToNextFrame] = useState(false)
        const [toPreviousFrame, goToPreviousFrame] = useState(false)
        const [createdFilmstripId, setCreatedFilmstripId] = useState(false)
        const [dialogOpen, setDialogOpen] = useState(true)

        const nextQuestion = event => {
            event.preventDefault()

            if (currentFrameIndex === filmstrip.frames.length - 1) {
                const frames = filmstrip.frames.map(f => {
                    return Object.assign(
                        {
                            no: f.no,
                            responseToFrameId: f._id,
                            responseToFilmstripId: filmstrip._id,
                            title: f.title,
                            description: f.description
                        },
                        JSON.parse(localStorage.getItem(f._id))
                    )
                })

                ResponseSave.call(
                    {
                        filmstrip: {
                            responseToFilmstripId: filmstrip._id,
                            name: filmstrip.name,
                            email
                        },
                        frames
                    },
                    (err, res) => {
                        if (err) console.error(err)
                        else {
                            setCreatedFilmstripId(res)
                            goToFinish(true)
                        }
                    }
                )
            } else {
                goToNextFrame(true)
            }
        }

        const frames = filmstrip.frames

        if (toFinish === true) {
            const url = `/a/${filmstrip._id}/${emailBase64}/${createdFilmstripId}/finish`
            return <Redirect push to={url} />
        }

        if (toPreviousFrame === true) {
            const url = `/response/${filmstrip._id}/${frames[currentFrameIndex - 1]._id}/${emailBase64}`
            return <Redirect push to={url} />
        }

        if (toNextFrame === true) {
            const url = `/response/${filmstrip._id}/${frames[currentFrameIndex + 1]._id}/${emailBase64}`
            return <Redirect push to={url} />
        }

        return (
            <>
                {currentFrameIndex === 0 ? (
                    <FTUDialog
                        dialogOpen={dialogOpen}
                        setDialogOpen={setDialogOpen}
                    />
                ) : null}
                <Grid style={{ paddingBottom: '72px' }}>
                    <GridCell span={12}>
                        <Typography
                            use='headline4'
                            tag='h4'
                            style={{ textAlign: 'center' }}>
                            {filmstrip.name || 'Untitled Filmstrip'}
                        </Typography>
                    </GridCell>
                    <GridCell desktop={6} tablet={4} phone={4}>
                        <ResponseQuestion
                            currentFrame={frame}
                            filmstrip={filmstrip}
                            currentFrameIndex={currentFrameIndex}
                            t={t}
                        />
                    </GridCell>
                    <StyledGridCell desktop={6} tablet={4} phone={4}>
                        <ResponseAnswer
                            key={frame._id}
                            currentFrame={frame}
                            filmstrip={filmstrip}
                            currentFrameIndex={currentFrameIndex}
                            t={t}
                            history={history}
                            email={email}
                            emailBase64={emailBase64}
                        />
                    </StyledGridCell>
                </Grid>
                <StickyNav
                    index={currentFrameIndex}
                    max={frames.length}
                    prevTitle={t('Response.PrevQuestion')}
                    nextTitle={t('Response.NextQuestion')}
                    finishTitle={t('Response.Finish')}
                    onPrevious={event => {
                        event.preventDefault()
                        goToPreviousFrame(true)
                    }}
                    onNext={nextQuestion}
                />
            </>
        )
    },
    {
        isFullWidth: true
    }
)
