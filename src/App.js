import './App.css';
import {RecoilRoot} from 'recoil'
import {AdventureEditor} from './Components/AdventureEditor'

/*
TODO:
Random value in effects support.
Basic validation of loops/invalid node ids and such.
Styling this to look good aaahhh!!!
*/

function App(){
  return (
    <RecoilRoot>
      <AdventureEditor/>
    </RecoilRoot>
  )
}

export default App;
