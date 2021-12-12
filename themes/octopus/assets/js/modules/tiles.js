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
    stationIds.forEach((id, index) => {
      console.log(stationNames[index], id, data[id].days[0].temperatureMin, data[id].days[0].temperatureMax);
    });
  })
  .catch(error => console.error(error));


export class TilesGenerator {
  constructor(options) {
    this.target = options.target;
    this.tileWidthMin = options.tileWidthMin;
    this.tileWidthMax = options.tileWidthMax;
  }
  
  tileWidthAndTotalItems = () => {
    const min = this.tileWidthMin;
    const max = this.tileWidthMax;
    let width = [];
    let matches = [];
    let tileWidthAndTotal = [];
    
    const getElementsTotal = tileWidth => {

      let tilesInRow = window.innerWidth / tileWidth;
      let tilesInColumn = window.innerHeight / tileWidth;
      let elementsTotal = Math.floor(tilesInRow) * Math.floor(tilesInColumn);
      return elementsTotal;
    }
    
    for (let i = min; i <= max; i++) {
      
      if (window.innerWidth % i === 0) {
        width.push(i);
      } 
    }

    if (width.length) {
      for (let j = 0; j < width.length; j++) {

        if (window.innerHeight % width[j] === 0) {
          matches.push(width[j]);
        }
      }

      if (matches.length) {
        let w = this.randomIndexFromArray(matches);
        tileWidthAndTotal[0] = w;

        let t = getElementsTotal(w);
        tileWidthAndTotal[1] = t;
        
        return tileWidthAndTotal;
      }
    }
    
    if (!matches.length) {
      width = [];
      for (let i = min; i <= max; i++) {
        if (i % 2 === 0) {
          width.push(i);
        }
      }
      
      let w = this.randomIndexFromArray(width);
      tileWidthAndTotal[0] = w;

      let t = getElementsTotal(w);
      tileWidthAndTotal[1] = t;
      
      return tileWidthAndTotal;
    }
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
    
    
    let getWidthAndElements = this.tileWidthAndTotalItems();
    let tileWidth = getWidthAndElements[0];
    let totalElements = getWidthAndElements[1];
    
    for(let i = 0; i < totalElements; i++) {
      let minWidth = `width: ${tileWidth}px;`;
      let minHeight = `height: ${tileWidth}px;`;
      let tile = document.createElement('li');
      this.target.appendChild(tile);
      tile.style.cssText = `background-color: ${this.randomIndexFromArray(colors)};` + minWidth + minHeight;
    }
  }
  
  init = () => {
    this.createItems();
  }
}

const tiles = document.querySelector('.tiles');

if (tiles) {
  
  const tilesPage = new TilesGenerator({
    target: document.querySelector('.tiles__inner'),
    tileWidthMin: 20,
    tileWidthMax: 40
  });
  
  tilesPage.init();
}
