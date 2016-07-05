var React = require('react');
var ReactDOM = require('react-dom');

var OptionView = React.createClass({
  render: function(){
    var Options = this.props.options.map(
      function(option,index){
        return (<Option option = {option} key={index} />);
      }
    );
    return(
      <div>
          {Options}
          <input className="form-control" type="radio"/> Other: <input className="form-control" />
      </div>
    );
  }
});

var Option = React.createClass({
  render: function(){
    return (
      <div className="form-group">
        <input type="radio" />{data.option}
      </div>
    )
  }
});

ReactDOM.render(<OptionView options={data.options} />, document.getElementById("options"))
