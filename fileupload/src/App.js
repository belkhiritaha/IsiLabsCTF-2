import logo from './logo.svg';
import './App.css';

function App(props) {
    if (props.data) {
        return (
            <div className="App">
                <header className="App-header">
                    <p>
                        {props.data}
                    </p>
                </header>
            </div>
        );
    }

    return (
        <div className="App">
            <header className="App-header">
                <form id="uploadForm" encType="multipart/form-data" action="http://localhost:2000/upload" method="post">
                    <input type="file" name="myfile" /><br /><br />
                    <input type="submit" value="Upload Image" name="submit" /><br /><br />
                    <span id="status"></span>
                </form>
            </header>
        </div>
    );
}

export default App;
