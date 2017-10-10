import React, { Component } from 'react';
import './App.css';
import Accordion from 'react-bootstrap/lib/Accordion';
import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Modal from 'react-bootstrap/lib/Modal';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';



class App extends Component {

state={
  recipes:[],
  showAdd:false,
  showEdit:false,
  currentIndex:0,
  newestRecipe:{recipeName:'',ingredients:[]}
};
//delete a recipe
deleteRecipe(index){
  let recipes=this.state.recipes.slice();
  recipes.splice(index,1);
  localStorage.setItem('recipes',JSON.stringify(recipes));
  this.setState({recipes});
  this.setState({currentIndex:0});
}
//add a new recipe
addRecipe(value,ingredients){
  this.setState({newestRecipe:{recipeName:value,ingredients:ingredients}});
}
//save the new added recipe
saveNewRecipe(){
  let recipes=this.state.recipes.slice();
  recipes.push({recipeName:this.state.newestRecipe.recipeName,ingredients:this.state.newestRecipe.ingredients});
  localStorage.setItem('recipes',JSON.stringify(recipes));
  this.setState({recipes});
  this.setState({newestRecipe:{recipeName:'',ingredients:[]}});
  this.close();
}
//edit recipeName
updateRecipeName(value,currentIndex){
  let recipes=this.state.recipes.slice();
  recipes[currentIndex]={recipeName:value,ingredients:recipes[currentIndex].ingredients};
  localStorage.setItem('recipes',JSON.stringify(recipes));
  this.setState({recipes});
}
//edit ingredients
updateIngredients(value,currentIndex){
  let recipes=this.state.recipes.slice();
  recipes[currentIndex]={recipeName:recipes[currentIndex].recipeName,ingredients:value};
  localStorage.setItem('recipes',JSON.stringify(recipes));
  this.setState({recipes});
}
//close Modal
close=()=>{
  if(this.state.showAdd){
    this.setState({showAdd:false});
  }else if(this.state.showEdit){
    this.setState({showEdit:false});
  }
}
//open Modal
open = (state,currentIndex)=>{
  this.setState({[state]:true});
  this.setState({currentIndex});
}

componentDidMount(){
  let recipes=JSON.parse(localStorage.getItem("recipes")) || [];
  this.setState({recipes});
}

  render() {
    const {recipes,currentIndex,newestRecipe}=this.state;
    console.log(newestRecipe);
    return (
      <div className="App container margin1 ">
        <h1>Cool Recipe</h1>
        {recipes.length>0 && (
        <div className="div2">
        <Accordion>
          {recipes.map((recipe,index)=>(
            <Panel header={recipe.recipeName} eventKey={index} key={index} className="margin2">
             <ol>
               {recipe.ingredients.map((item,index1)=><li key={index1}>{item}</li>)}
             </ol>
             <ButtonToolbar>
               <Button bsStyle="danger" onClick={(event)=>this.deleteRecipe(index)}>Delete Recipe</Button>
               <Button bsStyle="info" onClick={(event)=>this.open("showEdit",index)}>Edit Recipe</Button>
             </ButtonToolbar>
            </Panel>
          ))}
        </Accordion>

        <Modal show={this.state.showEdit} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Recipe</Modal.Title>
          </Modal.Header>
            <Modal.Body>
              <FormGroup>
                <ControlLabel>Recipe Name</ControlLabel>
                <FormControl type="text"
                  value={recipes[currentIndex].recipeName}
                  placeholder="Enter a new Recipe Name"
                  onChange={(event)=>this.updateRecipeName(event.target.value,currentIndex)}
                  ></FormControl>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Ingredients</ControlLabel>
                <FormControl type="textarea"
                  placeholder="Please enter new ingredients (Seperate by Commas)"
                  value={recipes[currentIndex].ingredients}
                  onChange={(event)=>this.updateIngredients(event.target.value.split(','),currentIndex)}
                  ></FormControl>
              </FormGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button bsStyle="primary" onClick={(event)=>this.close()}>Update</Button>
            </Modal.Footer>
        </Modal>
      </div>
      )}

        <Modal show={this.state.showAdd} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Add Recipe</Modal.Title>
            <Modal.Body>
              <FormGroup controlId="formBasicText">
                <ControlLabel>Recipe Name</ControlLabel>
                <FormControl type="text"
                  value={newestRecipe.recipeName}
                  placeholder="Enter Recipe Name"
                  onChange={(event)=>this.addRecipe(event.target.value,newestRecipe.ingredients)}
                  ></FormControl>
              </FormGroup>
              <FormGroup controlId="formControlTextarea">
                <ControlLabel>Recipe Ingredients</ControlLabel>
                <FormControl type="textarea"
                  value={newestRecipe.ingredients}
                  placeholder="Enter Recipe ingredients (Seperate by Commas)"
                  onChange={(event)=>this.addRecipe(newestRecipe.recipeName,event.target.value.split(','))}
                  ></FormControl>
              </FormGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button bsStyle="primary" onClick={(event)=>this.saveNewRecipe()}>Add</Button>
            </Modal.Footer>
          </Modal.Header>
        </Modal>

        <Button bsStyle="primary" onClick={(event)=>this.open("showAdd",currentIndex)} className="margin2">Add Recipe</Button>

      </div>
    );
  }
}

export default App;
