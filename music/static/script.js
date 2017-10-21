class Music extends React.Component {
  constructor(props) {
      super(props);
  }
  
  remove() {
    this.props.removeMusic(this.props.index, this.props.data.id);
  }
  
  render() {
    return (
      <div className='row'>
        <p className='col-sm-4'>{this.props.data.name}</p>
        <audio className='col-sm-4' controls autoPlay>
          <source src={this.props.data.url} type='audio/mpeg' />
          Your browser does not support the audio tag.
        </audio>
        <button className='col-sm-4 btn btn-danger' onClick={this.remove.bind(this)}>remove</button>
      </div>
    );
  }
}

class PlayList extends React.Component {
  constructor(props) {
      super(props);
      
      this.state = {
        musics: []
      };
      
      this.loadMusics();
      
      var self = this;
   }
   
   loadMusics() {
      var self = this;
               
      $.getJSON('/music', function(musics) {
        self.state.musics = musics;
        self.setState(self.state);
      });
   }
   
   removeMusic(index, id) {
      var state = this.state;
      state.musics.splice(index, 1);
      this.setState(state);
      $.post('/music/delete/' + id);
   }
   
   onNewMusicValueChange(event) {
     this.state.newMusic = this.state.newMusic || {};
     this.state.newMusic[event.target.name] = event.target.value;
     this.setState(this.state);
   }
   
   addMusic() {
     var self = this;
     
     $.post('/music/', self.state.newMusic, function() {
        self.loadMusics();  
     });
   }
   
   renderAction() {
      var self = this;
      return this.state.musics.map(function(music, index) {
        return <Music key={music.id} data={music} index={index} removeMusic={self.removeMusic.bind(self)} />
      });
   }
  
  render() {
    return (
      <div className='container'>
        <form>
          <div className='form-group'>
            <label htmlFor='name'>Music name:</label>
            <input type='text' className='form-control' id='name' name='name' onChange={this.onNewMusicValueChange.bind(this)} />
          </div>
          <div className='form-group'>
            <label htmlFor='url'>Music url:</label>
            <input type='url' className='form-control' id='url' name='url' onChange={this.onNewMusicValueChange.bind(this)} />
          </div>
          <button type='button' className='btn btn-default' onClick={this.addMusic.bind(this)}>Create music</button>
          <hr />
        </form>
        {
          this.renderAction()
        }
      </div>
    );
  }
}

ReactDOM.render(
  <PlayList />,
  document.getElementById('playlist')
);