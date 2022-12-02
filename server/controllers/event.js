let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');

// create a reference to the model
let Event = require('../models/event');

module.exports.displayEventList = (req, res, next) => {
    Event.find((err, eventList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(EventList);

            /*
            res.render('event/list', 
            {title: 'Events', 
            EventList: eventList, 
            displayName: req.user ? req.user.displayName : ''});      
            */

            res.json(eventList);
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    /*
    res.render('event/add', {title: 'Add Event', 
    displayName: req.user ? req.user.displayName : ''});
    */
   
    res.json({success: true, msg: 'Succesfully Displayed Add Page'});
}

module.exports.processAddPage = (req, res, next) => {
    let newEvent = Event({
        "name": req.body.name,
        "date": req.body.date,
        "description": req.body.description,
        "price": req.body.price
    });

    Event.create(newEvent, (err, Event) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the event list
            //res.redirect('/event-list');

            res.json({success: true, msg: 'Successfully Added New Event'});
        }
    });

}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Event.findById(id, (err, eventToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            /*
            res.render('event/edit', {title: 'Edit Event', event: eventToEdit, 
            displayName: req.user ? req.user.displayName : ''});
            */

            res.json({success: true, msg: 'Successfully Displayed Event to Edit', event: eventToEdit});
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedEvent = Event({
        "_id": id,
        "name": req.body.name,
        "date": req.body.date,
        "description": req.body.description,
        "price": req.body.price
    });

    Event.updateOne({_id: id}, updatedEvent, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the event list
            //res.redirect('/event-list');

            res.json({success: true, msg: 'Successfully Edited Event', event: updatedEvent});
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Event.deleteOne({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             // refresh the Event list
             //res.redirect('/event-list');

             res.json({success: true, msg: 'Successfully Deleted Event'});
        }
    });
}