import randomColor from 'randomcolor';
import { stations } from '../data/stations';


// keyObject = () => {
//   stations.forEach(station => {
//     for (const [key, value] of Object.entries(station)) {
//       console.log(`${key}: ${value}`);
//     }
//   });
// }

// keyObject();

createFetchUrl = () => {
  const apiUrl = 'https://dwd.api.proxy.bund.dev/v30/stationOverviewExtended?stationIds=';
  const stationIds = [];
    
  stations.forEach(station => {
    stationIds.push(station.id);
  });

  const url = apiUrl + stationIds.join();
  return url;
}

getStationIds = () => {
  const stationIds = [];
  
  stations.forEach(station => {
    stationIds.push(station.id);
  });
  
  return stationIds;
}

getStationNames = () => {

  const stationNames = [];

  stations.forEach(station => {
    stationNames.push(station.name);
  });
  
  return stationNames;

}

const fetchURl = createFetchUrl();
const stationIds = getStationIds();
const stationNames = getStationNames();

fetch(fetchURl)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // stationIds.forEach((id, index) => {
    //   console.log(stationNames[index], id, data[id].days[0].temperatureMin, data[id].days[0].temperatureMax);
    // });
  })
  .catch(error => console.error(error));


export class TilesGenerator {
  constructor(options) {
    this.target = options.target;
    this.tileWidth = options.tileWidth;
  }

  calcRect = () => {
   
    const min = 10;
    const max = 150;
    let width = [];
    let matches = [];
    

    for (let i = min; i <= max; i++) {
      
      if (window.innerWidth % i === 0) {
        width.push(i);
      } 
    }

    for (let j = 0; j < width.length; j++) {

      // console.log(width[j], window.innerHeight % width[j]);
      
      if (window.innerHeight % width[j] === 0) {
        matches.push(width[j]);
      }

      
    }
  }

  getElementsTotal = () => {
    // let elementsTotal = (window.innerWidth / this.tileWidth) * (window.innerHeight / this.tileWidth);
    let tilesInRow = window.innerWidth / this.tileWidth;
    let tilesInColumn = window.innerHeight / this.tileWidth;
    let elementsTotal = Math.floor(tilesInRow) * Math.floor(tilesInColumn);
    console.log(Math.floor(tilesInRow), Math.floor(tilesInColumn), elementsTotal);
    return elementsTotal;
  }

  randomIndexFromArray = (array) => {
    return array[Math.floor(Math.random()*array.length)];
  }

  createItems = () => {
    let colors = randomColor({
      luminosity: 'random',
      hue: 'random',
      count: 12
    });
    
    let totalItems = this.getElementsTotal();
    // console.log(totalItems);
    
    for(let i = 0; i < totalItems; i++) {
      let minWidth = `width: ${this.tileWidth}px;`;
      let minHeight = `height: ${this.tileWidth}px;`;
      let tile = document.createElement('li');
      this.target.appendChild(tile);
      tile.style.cssText = `background-color: ${this.randomIndexFromArray(colors)};` + minWidth + minHeight;
    }
  }
  
  init = () => {
    this.createItems();
    this.calcRect();
  }
}

const tiles = document.querySelector('.tiles');

if (tiles) {
  
  const tilesPage = new TilesGenerator({
    target: document.querySelector('.tiles__inner'),
    tileWidth: 30,
  });
  
  tilesPage.init();

}




