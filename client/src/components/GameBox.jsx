var React = require('react');
var GuessForm = require('./GuessForm.jsx');
var Reset = require('./Reset.jsx');
var CharactersBox = require('./CharactersBox.jsx');
var QuestionsForm = require('./QuestionsForm.jsx');
var NationalityForm = require('./NationalityForm.jsx');
var bastards = require('../sample_data.js');


var GameBox = React.createClass({
  getInitialState: function() {
    return { allBastards: bastards, gameVillain: null }
  },
  
  componentDidMount: function() {
  this.selectRandomCharacter();
  },

  selectRandomCharacter: function(){
    var villains = this.state.allBastards;
    var rand = villains[Math.floor(Math.random() * villains.length)];
    this.setState( {eliminated: villains} );
    this.setRandomCharacter(rand);
  },

  setRandomCharacter: function(name){
    var gVillain = name;
    this.setState( { gameVillain: gVillain })
    console.log(gVillain);
  },

  getVillains: function(){
    var villains = []
    for (var item of this.state.allBastards){
      villains.push(item.Name)
    }
    return villains;
  },

  correctResponse: function(){
    var villains=this.state.allBastards;
    this.changeImageEnMass(villains);
    swal("Yay!", "Good guess! You are one step closer to pinning down that sneaky bastard.", "success");
  },

  incorrectResponse: function(){
    var villains=this.state.allBastards;
    this.changeImageEnMass(villains);
    swal("Oops!", "Your selection is not true of the bastard in question", "error");
  },


  checkForGoodSelection: function(e){
    var cpuPlayer=this.state.gameVillain;
    var villains=this.state.allBastards;
    var selection=e.target.value;

      if(cpuPlayer[selection]=== "Yes"){
        var villainsNew = villains.map(function(el){
          console.log(el);
          if(el[selection] === "No"){
          el.src = "./images/not_this_bastard.jpg"
        }
        return el
        })
        this.setState( { allBastards: villainsNew });
        this.correctResponse();
      }
      if(cpuPlayer[selection] === "No"){
        var villainsNew = villains.map(function(el){
          console.log(el);
          if(el[selection] === "Yes"){
          el.src = "./images/not_this_bastard.jpg"
        }
        return el
        })
        this.setState( { allBastards: villainsNew });
        this.incorrectResponse();

      }
    },
    


    handleVillain: function(e){
      var options=this.state.allBastards
      var cpuPlayer=this.state.gameVillain
      var index = e.target.value
      console.log(options);
      console.log(options[index]);

      if(options[index].Name === cpuPlayer.Name){
        this.handleWin()
      } else {
        this.handleLose()
      }
   },

    handleWin: function(){
      console.log("You Win")
      swal("You Win!", "Yaaaaaaaaaaaaaaas!", "success")
    },

    handleLose: function(){
      console.log("You Lose")
      swal("Oops!", "Close but no cigar", "error");
    },


    changeImage: function(e){
      var all = this.state.allBastards;
      var cpuPlayer=this.state.gameVillain;
      var target = e.target;
      var index = e.target.value;
      console.log(target.id);

      if(cpuPlayer.Name === target.id){
        this.handleWin()
      } 
      if(cpuPlayer.Name != target.id){
        this.handleLose()
        var villains = all.map(function(el){
              console.log(el);
              if(el.Name === target.id){
              el.src = "./images/not_this_bastard.jpg"
              }
        });
        this.setState( { allBastards: all });
      }
  },

    changeImageEnMass: function(){
      var all = this.state.allBastards
      this.render();
      return all;
    },

    handleReset: function(){
      console.log("Rest function")
         window.location.reload();
    },




  render: function() {
    return (
      <div className="GameBox">
        <h1 id="title">Guess The Bastard</h1>

        <div className="CharactersBox">
        <CharactersBox 
        data={this.state.allBastards}
        changeImage={this.changeImage}
        changeImageEnMass={this.changeImageEnMass}
        />
        </div>

        <div className="QuestionsForm">
        <h1 id="DoesVillainHave">Eliminate Some Bastards</h1>
        <QuestionsForm 
        data={this.state.allBastards}
        handleQuestion={this.checkForGoodSelection}
        />
        </div>

        <div className="GuessForm">
        <h1 id="VillainGuess">Guess The Bastard</h1>
        <GuessForm 
        data={this.state.allBastards}
        villains={this.getVillains()}
        handleVillain={this.handleVillain}
        />
        </div>

        <div className="Reset">
        <Reset
         handleReset={this.handleReset}
         />
        </div>

      </div>
    );
  }
});

  module.exports = GameBox;

  

