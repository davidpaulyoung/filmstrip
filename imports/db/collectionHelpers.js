import { Mongo } from 'meteor/mongo'
import { check, Match } from 'meteor/check'
import set from 'lodash/set'

export const createCollection = (name, doForbidClientSideUpdats = true) => {
    const collection = Meteor[name] ? Meteor[name] : new Mongo.Collection(name)
    const oldInsert = collection.insert
    const oldUpdate = collection.update
    const oldUpsert = collection.upsert
    collection.insert = (doc, callback) => {
        doc.createdAt = new Date()
        doc.createdBy = getUserId()
        oldInsert.call(collection, doc, callback)
    }
    collection.update = (selector, modifier, options, callback) => {
        set(modifier, '$set.modifiedAt', new Date())
        set(modifier, '$set.modifiedBy', getUserId())
        oldUpdate.call(collection, selector, modifier, options, callback)
    }
    collection.upsert = (selector, modifier, options, callback) => {
        set(modifier, '$set.modifiedAt', new Date())
        set(modifier, '$set.modifiedBy', getUserId())
        oldUpsert.call(collection, selector, modifier, options, callback)
    }
    if (doForbidClientSideUpdats) forbidClientSideUpdates(collection)
    return collection
}

export const forbidClientSideUpdates = collection =>
    collection.deny({
        insert: () => true,
        update: () => true,
        remove: () => true,
    })

export const createStandardPublications = (collection, plural, singular) => {
    if (Meteor.isClient) return
    const pluralName = plural || collection._name
    const singularName = singular || pluralName.substring(0, pluralName.length - 1)
    // console.log("publishing", pluralName, singularName)
    Meteor.publish(pluralName, () => collection.find())
    Meteor.publish(singularName, function(_id) {
        check([_id], [String])
        if (!this.userId) return this.ready()
        return collection.find({_id})
    })
}        

const getUserId = () => {
    try {
        return Meteor.userId()
    }  finally {
        return 'system'
    }
}
