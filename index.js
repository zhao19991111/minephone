'use strict';
import ‘./sstyle.css’;

class Feedback extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
        }
    }

    changeText(event) {
        this.setState({
            text: event.target.value,
        });
    }

    clear() {
        this.setState({
            text: '',
        });
    }

    render() {
        var remainingChar = 150;
        var text = this.state.text;
        return <div>
            <form>
                <textarea
                    id="feedback"
                    cols="50" rows="5"
                    maxlength="150"
                    placeholder="Share your feedback with us!"
                    value={this.state.text}
                    onChange={this.changeText.bind(this)}>
                    </textarea><br />
                <span> <button type="button" onClick={()=>this.props.record(text)}> Submit </button>
                    <button type="button" onClick={()=>this.clear()}> Clear </button>
                    <p>remaining characters:{remainingChar - text.length}</p>
            </span> 
            </form>
        </div>
    }
    
}

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            numberOfLikes : 0,
        };
    }


    like = () => {
        var num = this.state.numberOfLikes + 1;
        this.setState ({
            numberOfLikes: num,
        });
    }

    render() {
        return <div>
            <div id="commentArea">
                <div style={{ float: 'left', }}>
                    <p id="text">{this.props.content}</p>
                </div>
                <div style={{ float: 'right', }}>
                <button id="like" 
                    onClick={this.like}>
                        like!  {this.state.numberOfLikes}
                </button>
                </div>
              </div>
           
        </div>
    }
}


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            numOfComments: 1,
            comment: ["It is amazing!"],
            isFull: false,
        };
    }

    recordContent=(content)=> {
        var num = this.state.numOfComments + 1;
        var com = this.state.comment
        if (content != '' && this.state.isFull === false) {
            com.push(content);
            if (this.state.numOfComments < 10) {
                this.setState(
                    {
                        numOfComments: num,
                        comment: com,
                    });
            }
            else {
                this.setState(
                    {
                        isFull: true,
                    });
            }
        }
    }

    render() {
        var comments = this.state.comment;
        var num = this.state.numOfComments;
        if (num < 10) {
            var warning = "";
        }
        else
            warning = "About to reach the maximum number of comments";
        var list = comments.map((value) => {
           return (
                    <Comment content={value}/>
            )})
        return <div>
            <div id = 'title'>
                <h1> Comments: </h1>
            </div>
            <div id='commentArea'>
                {list}
            </div>
            <div id='feedback'>
                <Feedback record={(content)=>this.recordContent(content)} />
                <p style={{ color: 'red' }}> {warning} </p>
            </div>
            </div>
     
    };
}


const domContainer = document.querySelector('#comment');
ReactDOM.render(<App/>, domContainer);


    



