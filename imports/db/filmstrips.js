import { Frames } from './frames.js'
import { Invites } from './invites.js'
import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { createCollection } from './collectionHelpers.js'

export const Filmstrips = createCollection('Filmstrips')

if (Meteor.isServer) {
    Meteor.publish('Filmstrips', function() {
        if (!this.userId) return this.ready()
        return Filmstrips.find({ createdBy: this.userId })
    })
    Meteor.publish('Filmstrip', function(_id) {
        check([_id], [String])
        if (!this.userId) return this.ready()
        return [Filmstrips.find({ _id }), Frames.find({ filmstripId: _id })]
    })
    Meteor.publish('ResponseFilmstrip', function(_id) {
        check([_id], [String])
        return [
            Filmstrips.find({ _id: _id }),
            Frames.find({ filmstripId: _id })
        ]
    })
    Meteor.publish('CompletedFilmstripResponses', function(_id) {
        check([_id], [String])
        if (!this.userId) return this.ready()
        return [
            Filmstrips.find({
                responseToFilmstripId: _id,
                confirmed: { $eq: true }
            }),
            Frames.find({
                responseToFilmstripId: _id,
                no: 1
            })
        ]
    })
    Meteor.publish('SharedFilmstrip', function(_id) {
        check([_id], [String])
        return [
            Filmstrips.find({ _id: _id }),
            Frames.find({ filmstripId: _id })
        ]
    })
    Meteor.publish('FilmstripsWithFrameIdAndInvites', function() {
        if (!this.userId) return this.ready()
        const filmstrips = Filmstrips.find({ createdBy: this.userId })
        const filmstripIDs = filmstrips.map(f => f._id)
        const frames = Frames.find({ filmstripId: { $in: filmstripIDs } }, { fields: { filmstripId: 1, no: 1 } }) 
        const invites = Invites.find({ filmstripId: { $in: filmstripIDs } }, { fields: { filmstripId: 1 } }) 
        return [filmstrips, frames, invites]
    })
}

// # Frames / Slides
// Required fields:
// Name - String
// Type (outbound/inbound) - String
// Video - record/replace button and field will hold video path. Also will display keyframe image.
// Optional Fields
// Desc - String
// Link - String
// File - Array of Url/Filename Objects
