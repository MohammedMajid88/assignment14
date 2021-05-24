const string = "Prius,2017,red,automatic,y,y,y,n,n,y,10000#Ionic,2020,blue,automatic,y,y,y,y,y,y,13000#Audi,2013,gray,manual,y,y,n,n,n,n,7500#Golf,1995,black,manual,n,n,n,n,n,n,2100#Kia,2007,white,automatic,n,y,n,n,n,n,5300#Mercedes,1998,silver,automatic,y,y,y,n,n,n,8600";
console.log(formatCarInfo(sortCars(calculateTotalPrice(parseCarInfo(string)))));
function parseCarInfo(fullString) {
  return fullString.split('#').map(carString => {
    const fields = carString.split(',');
    return {
      type: fields[0],
      model: +fields[1],
      color: fields[2],
      transmission: fields[3],
      features: {
        ac: fields[4] === 'y',
        electricWindows: fields[5] === 'y',
        electricMirrors: fields[6] === 'y',
        sunroof: fields[7] === 'y',
        autopark: fields[8] === 'y',
        cruiseControl: fields[9] === 'y',
      },
      originalPrice: +fields[10],
    }
  });
}
function getModelCustoms(model) {
	if (model >= 2015) {
      return 0.1;
    } else if (model <= 2014 && model >= 2010) {
      return 0.08;
    } else if (model <= 2009 && model >= 2005) {
      return 0.06;
    } else if (model <= 2004 && model >= 2000) {
      return 0.04;
    } else if (model <= 1999) {
      return 0.02;
    }
}
function getFeaturesCustoms(features) {
		let totalCustoms = 0;
		if (features.ac) {
      totalCustoms += 0.05;
    }
    if (features.electricWindows) {
      totalCustoms += 0.08;
    }
    if (features.electricMirrors) {
      totalCustoms += 0.06;
    }
    if (features.sunroof) {
      totalCustoms += 0.07;
    }
    if (features.autopark) {
      totalCustoms += 0.05;
    }
    if (features.cruiseControl) {
      totalCustoms += 0.04;
    }
		return totalCustoms;
}
function calculateTotalPrice(cars) {
  return cars.map(car => {
    let totalCustoms = 0;
    const
      model = car.model,
      features = car.features;
		totalCustoms += getModelCustoms(model);
    if (car.transmission === 'automatic') {
      totalCustoms += 0.03;
    }
    totalCustoms += getFeaturesCustoms(features);
    car.totalPrice = car.originalPrice + (car.originalPrice * totalCustoms);
    return car;
  });
}
function sortCars(cars) {
  cars.sort((first, second) => {
    return second.totalPrice - first.totalPrice;
  });
  return cars;
}
function getYesOrNo(feature) {
	return feature ? 'Yes' : 'No'
}
