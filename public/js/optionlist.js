var React = require('react');
var ReactDOM = require('react-dom');

var Option = React.createClass({
  render: function(){
    return (
      <div className="radio radio-primary">
        <label>
          <input name="option" type="radio" value={this.props.value}/>{this.props.option[0]}
        </label>
      </div>
    )
  }
});

var OptionView = React.createClass({
  render: function(){
    var Options = this.props.options.map(
      function(option,index){
        return (<Option value = {index} option = {option} key={index} />);
      }
    );
    return(
      <form role="form" action={"/api/vote/" + data._id} method="POST">
          <div className="form-group">
            {Options}
            <div className="radio radio-primary">
              <label><input type="radio" name="option" value="add"/>Other</label>
            </div>
              <input className="form-control" type="text" name="addoption" />
          </div>
          <button type="submit" className="btn btn-raised btn-primary"> Submit </button>
      </form>
    );
  }
});

ReactDOM.render(<OptionView options={data.options} />, document.getElementById("options"))
