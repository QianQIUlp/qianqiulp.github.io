import {buildGuitarSurface} from './guitar-surface.js';
self.onmessage = async ({data}) => {
  try {
    const result = await buildGuitarSurface(data.points, data.edge);
    self.postMessage(result, Object.values(result).map(array => array.buffer));
  } catch (error) {self.postMessage({error: error.message});}
};
