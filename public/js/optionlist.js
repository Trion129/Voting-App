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
      <form role="form" action={"/api/vote/" + data._id} method="POST">
          <div className="form-group">
            {Options}
            <div className="radio radio-primary">
              <label><input type="radio" name="option"/>Other</label>
            </div>
              <input className="form-control" type="text" name="option" />
          </div>
          <button type="submit" className="btn btn-raised btn-primary"> Submit </button>
      </form>
    );
  }
});

var Option = React.createClass({
  render: function(){
    return (
      <div className="radio radio-primary">
        <label>
          <input name="option" type="radio" />{this.props.option[0]}
        </label>
      </div>
    )
  }
});

ReactDOM.render(<OptionView options={data.options} />, document.getElementById("options"))
