import { Meteor } from 'meteor/meteor'
import React from 'react'
import { TextField } from 'rmwc'
import { withTracker } from 'meteor/react-meteor-data'
import { Queues } from '/imports/db/queues.js'
import { loadingWrapper } from '/imports/ui/UIHelpers.js'

const QueueItemContent = ({item}) =>
    <form>
        {/* TODO: data-length provokes ReferenceError: M is not defined */}
        {/* <TextInput label="Title" value={item.value} data-length={50}/> */}
        {/* <Textarea label="Description" data-length={120}/> */}
        <TextField label="Title" value={item.title} onChange={(v) => console.log(v)}/>
        <TextField textarea label="Description" value={item.description} onChange={(v) => console.log(v)}/>
        

    </form>

const QueuesItemWrapper = ({isLoading, item}) => 
    <ul>
        {loadingWrapper(isLoading, () => 
            <QueueItemContent key={item._id} item={item} />)
        }
    </ul>

export const QueueItem = withTracker(({ match }) => {
    const handle = Meteor.subscribe('Queue', match.params.id)
    return {
        isLoading: !handle.ready(),
        item: Queues.findOne()
    }
})(QueuesItemWrapper)