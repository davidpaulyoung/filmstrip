import React from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import Layout from './components/Layout'

import { SignUp } from '/imports/ui/components/users/SignUp.jsx'
import { SignIn } from '/imports/ui/components/users/SignIn.jsx'

import AnswerLayout from '/imports/ui/components/answer/AnswerLayout.jsx'
import { AnswerLanding } from '/imports/ui/components/answer/AnswerLanding.jsx'
import { AnswerQuestionnaire } from '/imports/ui/components/answer/AnswerQuestionnaire.jsx'
import { AnswerFinish } from '/imports/ui/components/answer/AnswerFinish.jsx'
import { AnswerSent } from '/imports/ui/components/answer/AnswerSent.jsx'
import { AnswerConfirm } from '/imports/ui/components/answer/AnswerConfirm.jsx'

import { FilmstripsList } from './components/FilmstripsList.jsx'
import { FilmstripsItem } from './components/FilmstripsItem.jsx'
import { Filmstrip } from './components/Filmstrip.jsx'
import { FrameVideoRecorder } from '/imports/ui/components/FrameVideoRecorder.jsx'
import { ThemeProvider } from 'rmwc'

import 'css-reset-and-normalize/css/reset-and-normalize.min.css'
import 'material-components-web/dist/material-components-web.min.css'

const AppRoute = ({ component: RouteComponent, layout: RouteLayout, ...rest }) => (
    <Route {...rest} render={props => (
        <RouteLayout>
            <RouteComponent {...props} />
        </RouteLayout>
    )} />
)

export default App = () =>
    <ThemeProvider
        options={{
            'primary': '#1c5784',
            'secondary': '#37474f',
            'error': 'red',
            'background': '#eeeeee',
            'surface': 'white',
            'primaryBg': '#1c5784',
            'secondaryBg': '#37474f',
            'textPrimaryOnBackground': '#333333',
            'textSecondaryOnBackground': '#666666',
            'textHintOnBackground': '#999999',
            'textDisabledOnBackground': '#999999',
            'textIconOnBackground': '#ffffff',
            'textPrimaryOnLight': '#ffffff',
            'textSecondaryOnLight': '#ffffff',
            'textHintOnLight': '#ffffff',
            'textDisabledOnLight': '#ffffff',
            'textIconOnLight': '#ffffff'
        }}
    >
        <Router>
            <Switch>
                <AppRoute exact path="/" component={Home} layout={Layout} />
                <AppRoute path="/filmstrips" component={FilmstripsList} layout={Layout} />
                <AppRoute path="/filmstrip/:filmstripId/:frameId" component={FilmstripsItem} layout={Layout} />
                <AppRoute exact path="/filmstrip" component={Filmstrip} layout={Layout} />
                <AppRoute exact path="/signUp" component={SignUp} layout={Layout} />
                <AppRoute exact path="/signIn" component={SignIn} layout={Layout} />
                <AppRoute exact path="/a/:id" component={AnswerLanding} layout={AnswerLayout} />
                <AppRoute exact path="/a/:id/:emailBase64" component={AnswerLanding} layout={AnswerLayout} />
                <AppRoute exact path="/a/:id/:emailBase64/q" component={AnswerQuestionnaire} layout={AnswerLayout} />
                <AppRoute exact path="/a/:id/:emailBase64/finish" component={AnswerFinish} layout={AnswerLayout} />
                <AppRoute exact path="/a/:id/:emailBase64/sent" component={AnswerSent} layout={AnswerLayout} />
                <AppRoute exact path="/confirm/:id/:emailBase64" component={AnswerConfirm} layout={AnswerLayout} />
                <AppRoute exact path="/filmstrip/:filmstripId/:frameId/recordVideo" component={FrameVideoRecorder} layout={AnswerLayout} />
                <AppRoute exact path="/recordVideo/:filmstripId/:frameId" component={FrameVideoRecorder} layout={AnswerLayout} />
                <AppRoute component={NoMatch} layout={Layout} />
            </Switch>
        </Router>
    </ThemeProvider>

const Home = () => <h2>Home</h2>

const NoMatch = (props) => <div>404 - sorry, nothing found</div>
