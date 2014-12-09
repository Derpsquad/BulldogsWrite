var changePic = true;

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault("counter", 0);

    
  Template.body.helpers({
    picture: function() {
        var selection = Session.get("selection"); 
        if (selection == 1) {
            return "pic1.jpg";
        }
        else if (selection == 2) {
            return "pic2.jpg";
        }
        else if (selection == 3) {
            return "pic3.jpg";
        }
    }
  });
    
  Template.count.helpers({
    counter: function () {
      return Session.get("counter");
    },
    word_count: function() {
        return Session.get("word_count");
    },
  });

  Template.body.events({
    'keyup textarea': function() {
        Session.set("word_count", word_count($("#writearea").val()));
        if (word_count($("#writearea").val()) % 10 == 0) {
            if (changePic) {
                Session.set("selection", getRandomInt(1,4));
                fadeInLoad("#bulldogPic");
                changePic = false; //Prevents picture from changing again on space bar press
            }
            else {
                changePic = true;
            }
        }
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}


function word_count(text) {
    if (typeof localStorage != "undefined") localStorage.text = text;
    text = text.replace(/^\s*|\s*$/g,''); //removes whitespace from front and end
    text = text.replace(/\s+/g,' '); // collapse multiple consecutive spaces
    var words = text.split(" ");
    var word_count = words.length;
    Session.set("word_count", word_count);
    return word_count;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function fadeInLoad(element) {
    $(element).css("-webkit-animation", "");
    console.log($(element).css("-webkit-animation"));
    $(element).css("-webkit-animation", "fadeInLoad 0.5s");
    
    //Adding this if statement causes the animation to be triggered
    //Without it nothing happens for some reason (leave this in)
    /*if ($(element).css("-webkit-animation") == null) {
    }
    
    console.log($(element).css("-webkit-animation"));
    
    $(element).css("-webkit-animation", 'fadeInLoad 0.5s');*/
}