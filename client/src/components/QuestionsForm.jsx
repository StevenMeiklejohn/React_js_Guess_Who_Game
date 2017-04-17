var React = require('react');
var CharactersBox = require('./CharactersBox');



var QuestionsForm = React.createClass({








render: function() {
  var array = ["Fictional", "Alive", "Politician", "Hair", "Moustache"]
  var options = array.map(function(characteristic, index){
    return <option value={characteristic} key={index}>{characteristic} </option>
  })
  return (
    <div className="QuestionsForm">

      <div id="VillainForm1">
        <select id="DoesVillainHave" 
        onChange={this.props.handleQuestion}>
        <option value="" key="" describe=""> Select </option>
        {options}
        </select>
      </div>


    </div>
  );
}
});

    module.exports = QuestionsForm;