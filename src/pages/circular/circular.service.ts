import { Injectable } from '@angular/core';
import { CIRCULAR } from './circular-mock';

@Injectable()
export class CircularService {
    getCircularInfo(): Promise<any> {
        return Promise.resolve(CIRCULAR);
    }

    getCircularInfoByHour(circularHorarios, size, weekend, timeChoosen) {
    if (weekend === 1) {
      delete circularHorarios.Sábado;
    } else if (weekend === 2) {
      delete circularHorarios['Segunda a Sexta'];
    }
    for (var key in circularHorarios) {
      for (var shift in circularHorarios[key]) {
        var hours = circularHorarios[key];

        if (timeChoosen) {
          var index = getApproachTimeIndex(hours[shift], timeChoosen);
          hours[shift].splice(0, index);
        }

        shiftCollumnSort(hours, shift, size);
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
    for (var i = 0; i < object[shift].length; i += size) {
      newArray.push(object[shift].slice(i, i + size));
    }
    object[shift] = newArray;
  }