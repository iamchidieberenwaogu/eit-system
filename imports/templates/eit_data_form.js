import { Meteor } from 'meteor/meteor';
import { Templating } from 'meteor/templating';

import './eit_data_form.html';

Template.Eit_data_form.helpers({
  cohorts(){
    var startYear = 2008;
    var currentYear = (new Date()).getFullYear() + 1;
    var years = [];
    for(var i=startYear ; i<=(currentYear+2) ; i++){
      var year = {
        year: i
      };
      if(i == currentYear){
          year.current = true;
      }
      years.push(year);
    }
    return years;
  },

  countries(){
    return [
      {name:'Kenya'},
      {name:'Nigeria'},
      {name:'Ghana',default:true},
      {name:'Ivory Coast'},
      {name:'South Africa'},
      {name:'Tanzania'},
      {name:'Mali'},
      {name:'Zimbabwe'},
      {name:'Cameroon'},
      {name:'Sudan'},
      {name:'Somalia'},
      {name:'Gambia'}
    ];
  }
});

Template.Eit_data_form.events({
  'submit #eit_data_form'(event){
    event.preventDefault();
    var form = event.target;
    var data = {
      first_name: form.first_name.value,
      last_name: form.last_name.value,
      date_of_birth: form.date_of_birth.value,
      country: form.country.value,
      gender: form.gender.value,
      cohort: form.cohort.value
    };
    var id = form.id.value;
    if(id){
      Meteor.call('eits.update',id,data);
    }else{
      Meteor.call('eits.insert',data);
    }
    form.reset();
  }
});
