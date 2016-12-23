import { Injectable } from '@angular/core';
import { CIRCULAR } from './circular-mock';

@Injectable()
export class CircularService {
    getCircularInfo(): Promise<any> {
        return Promise.resolve(CIRCULAR);
    }

    getCircularInfoByHour(circularHorarios, size, weekend, timeChoosen) {
    if (weekend == 1) {
      circularHorarios.splice(1,1);
    } else if (weekend == 2) {
      circularHorarios.splice(0,1);
    }
      
    for (let i = 0; i < circularHorarios.length; i++) {
      for (let j = 0; j < circularHorarios[i].shifts.length; j++) {
        var hours = circularHorarios[i].shifts;

        if (timeChoosen) {
          var index = getApproachTimeIndex(hours[j].times, timeChoosen);
          hours[j].times.splice(0, index);
        }

        shiftCollumnSort(hours, j, size);
      }
    }

    return circularHorarios;
  }
};

  function getApproachTimeIndex(hours, timeChoosen) {
    return timeToFloat(hours[hours.length - 1]) <= timeToFloat(timeChoosen) ?

      hours.length :

      hours.findIndex(function (time, index) {
        if (timeToFloat(time) >= timeToFloat(timeChoosen)) {
          return index + 1;
        }
        return 0;
      });
  }

  function timeToFloat(time) {
    return time ? parseFloat(time.toString().replace(':', '.')) : null;
  }

  function shiftCollumnSort(object, shift, size) {
    var newArray = [];
    for (var i = 0; i < object[shift].times.length; i += size) {
      newArray.push(object[shift].times.slice(i, i + size));
    }
    object[shift].times = newArray;
  }