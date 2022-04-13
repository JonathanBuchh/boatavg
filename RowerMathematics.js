//Jack Blair 4/12/22

//Script to calculate the weight adjusted 2K of a rower in the sport of rowing.
//A Rower object stores the rowers 2k time and weight.
//At some point can be exanded to estimate other metrics based on certain pieces

const Pounds = 0
const Kilograms = 1


class Rower {
    constructor() {
        this.twoKTime = null; //In milliseconds
        this.weight = null; //In pounds

        //Yet to be implemented
        // this.fiveKTime = null; //In milliseconds
        // this.fiveHundredTime = null; //In milliseconds
        // this.maxWatts = null; //In watts
    }

    get2K() {
        return this.twoKTime; //returns in milliseconds
    }

    getWeight() {
        return this.weight; //returns in pounds
    }

    set2K(time) {
        this.twoKTime = time; //milliseconds
    }

    setWeight(weight, unit = Pounds) {
        if(unit == Pounds) {
            this.weight = weight;
        } else if(unit == Kilograms) {
            this.weight = weight * 2.20462;
        }
    }

    get weightFactor(){
        return this.calcWeightFactor();
    }

    calcWeightFactor(){
        if(this.weight == null) {
            return null;
        }

        return Math.pow((this.weight/270), 0.222);
    }

    get weightAdjusted2K() {
        return this.calcWeighted2K(); //returns in milliseconds
    }

    calcWeighted2K() {
        if(this.weight == null || this.twoKTime == null) {
            return null;
        }

        return this.twoKTime * this.weightFactor;
    }

    splitOf(time, distance, splitLength = 500){
      //Time argument must be less than 1 hour

      if(typeof(time) == "string"){
        time = parseTime(time);
      }
      else if(typeof(time) == "number"){
        time = time;
      }
      else{
        return null;
      }

      if(typeof(distance) == "string"){
        return null;
      }


      return formatTime(time/distance*splitLength);
    }
}

//method to parse 2k time (formatted as mm:ss.sss) into milliseconds
function parseTime(time) {
    //example valid times- "5:59.9", "5:59.99", "5:59.999", "5:49", 
    
    //split time into array (splitting on : and .)
    time = time.split(":");

    //if . in time[1]
    if(time[1].includes(".")) {
        
        let milliseconds = parseInt(time[0])*60000 + parseFloat(time[1])*1000;
        return milliseconds;
    }
    else{
        let milliseconds = parseInt(time[1])*1000 + parseInt(time[0])*60000;
        return milliseconds;
    }

}

//method to convert milliseconds to mm:ss.sss format
function formatTime(time) {
    //time is given in milliseconds
    //example valid times- "4334535", "43345", "433", "43", "4"

    //convert time to seconds
    time = time / 1000;

    //convert time to mm:ss.s format
    let minutes = Math.floor(time / 60);
    let remaining = time % 60;

    if (remaining < 10) {
      return minutes + ":0" + remaining.toFixed(1);
    }
    else{
      return minutes + ":" + remaining.toFixed(1);
    }
}


//Example Uses cases for the Rower class

//Jack
let Jack = new Rower();
let Jack2K = "7:22";
console.log("Jack's 2K time: " + Jack2K);
Jack.set2K(parseTime(Jack2K));
Jack.setWeight(146);
console.log("Jack's Weighted 2K Time: " + formatTime(Jack.weightAdjusted2K));
console.log("Jack's Weight Factor: " + Jack.weightFactor);
console.log("Jack's Split during a 2K: " + Jack.splitOf(Jack.twoKTime, 2000));

//Dermot
let Dermot = new Rower();
let Dermot2K = "7:09.4";
console.log("Dermot's 2K time: " + Dermot2K);
Dermot.set2K(parseTime(Dermot2K));
Dermot.setWeight(180);
console.log("Dermot's Weighted 2K Time: " + formatTime(Dermot.weightAdjusted2K));
console.log("Dermot's Weight Factor: " + Dermot.weightFactor);
console.log("Dermot's Split during a 2K: " + Dermot.splitOf("7:09.4", 2000)); //SplitOf can be given a time in any format

//Zach
let Zach = new Rower();
let Zach2K = "9:35.8";
console.log("Zach's 2K time: " + Zach2K);
Zach.set2K(parseTime(Zach2K));
Zach.setWeight(35); //Zach is a bit light (coxswain most likely)
console.log("Zach's Weighted 2K Time: " + formatTime(Zach.weightAdjusted2K));
console.log("Zach's Weight Factor: " + Zach.weightFactor);
console.log("Zach's Split during a 2K: " + Zach.splitOf(Zach.twoKTime, 2000));



//Yeeted Code from concept2.com
/**   

(function ($) {

    $(function(){
  
      $("#weight-adjustment-form").validate({
        rules: {
          weight_pounds: {
            required: '#weight_kilograms:blank',
            number: true
          },
          weight_kilograms: {
            required: '#weight_pounds:blank',
            number: true
          },
          hours: {
            digits: true
          },
          mins: {
            digits: true,
            maxlength: 2,
            max: 59
          },
          secs: {
            number: true
          },
          meters: {
            digits: true
          }
        },
        invalidHandler: function(form, validator) {
          $(".error-message").hide();
          $(".default").hide();
          $(".result").text(" ");
          var invalids = validator.invalid;
          $.each(invalids, function(key,value){
            if (key=="weight_pounds" || key=="weight_kilograms") {
              $(".error-message.e1").fadeIn("slow");
              $("#weight-factor").text(0);
            }
          });
        },
        submitHandler: function(form){
          $(".error-message").hide();
          $(".default").hide();
          $(".result").text(" ");
          var hours = Number($('#hours').val());
          var mins = Number($('#mins').val());
          var secs = Number($('#secs').val());
          var meters = Number($('#distance').val());
          var totalsecs;
          var weightfactor;
          var adjtime;
          var result;
          var showtime;
          var weight_pounds = $('#weight_pounds').val();
          var weight_kilograms = $('#weight_kilograms').val();
  
          if (weight_kilograms) {
            weight = weight_kilograms * 2.20462;
          }
          else {
            weight = weight_pounds;
          }
  
          totalsecs = ((hours * 3600) + (mins * 60) + secs);
          weightfactor = (Math.pow((weight/270),0.222)).toFixed(3);
          adjtime = (totalsecs * weightfactor).toFixed(2);
          adjhours = (adjtime/3600);
          adjmins = (adjhours % 1) * 60;
          adjsecs = ((adjmins % 1) * 60).toFixed(1);
  
          var showhours = Math.floor(adjhours);
          if (showhours < 10 && showhours !== 0) {
            showhours = "0" + showhours;
          }
  
          var showmins = Math.floor(adjmins);
          if (showmins < 10) {
            showmins = "0" + showmins;
          }
  
          var showsecs = adjsecs;
          if (Math.floor(showsecs)<10) {
            showsecs = 0 + adjsecs;
          }
  
          if (showhours) {
            showtime = showhours + ":" + showmins + ":" + showsecs;
          } else {
            showtime = showmins + ":" + showsecs;
          }
  
          var adjusted_distance;
          if (meters !== 0) {
            adjusted_distance = Math.floor((meters/weightfactor)) + "m";
          }
  
          $("#weight-factor").text(weightfactor);
  
          if (totalsecs) {
            $("#adjusted-time").text(showtime);
            $("#adjusted-time-text").show();
            $("#disclaimer").show();
          }
  
          if (adjusted_distance) {
            $("#adjusted-distance").text(adjusted_distance);
            $("#adjusted-distance-text").show();
            $("#disclaimer").show();
        }
          return false;
        }
      });
    });
  })(jQuery);
  */

