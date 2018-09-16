import {Meteor} from 'meteor/meteor';
import {Templating} from 'meteor/templating';

import { Eits } from '../api/eits.js';

import './body.html';
import '../templates/eit_data_form.js';

var deleteArray = [];

Template.body.onCreated(function bodyOnCreated() {
  Meteor.subscribe('eits');
});


Template.body.helpers({
  eits(){
    return Eits.find();
  }
});

Template.body.events({
  'click .update-eit'(event){
    var id = event.target.id;
    var eit = Eits.findOne({"_id":id});
    var form = document.querySelector('#eit_data_form');
    form.id.value = eit._id;
    form.first_name.value = eit.first_name;
    form.last_name.value = eit.last_name;
    form.date_of_birth.value = eit.date_of_birth;
    form.country.value = eit.country;
    form.gender.value = eit.gender;
    form.cohort.value = eit.cohort;
  },

  'click .delete-checkbox'(event){
    var id = event.target.value;
    if(event.target.checked){
      deleteArray.push(id);
    }else{
      deleteArray.splice(deleteArray.indexOf(id),1);
    }
  },

  'click #deleteEit'(event){
    for(var i=0; i<deleteArray.length; i++){
      Meteor.call('eits.remove',deleteArray[i]);
    }
  }
});
