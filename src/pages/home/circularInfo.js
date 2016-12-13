  function getCircularInfo() {
    var circularHorarios = {
      "Segunda a Sexta": {
        "Manhã": ["5:50", "6:15", "6:40", "7:00", "7:15", "7:30", "7:45", "7:46**", "7:50", "7:55", "8:00", "8:05", "8:10", "8:15", "8:20", "8:25", "8:30", "8:40", "8:50", "9:05", "9:30", "9:55", "10:20", "10:45", "11:00", "11:15", "11:25", "11:35", "11:35*", "11:45", "12:05", "12:25", "12:45", "12:55"],
        "Tarde": ["13:05", "13:20", "13:30", "13:35", "13:40", "13:50", "14:00", "14:15", "14:35", "14:55", "15:15", "15:40", "16:00", "16:10", "16:20", "16:30", "16:45", "16:55", "17:00", "17:05", "17:15", "17:25*", "17:35", "17:45", "17:50", "18:00", "18:10", "18:15", "18:20", "18:25", "18:30", "18:40", "18:45", "18:50", "18:55", "19:00"],
        "Noite": ["19:02", "19:05", "19:09", "19:14", "19:19", "19:25", "19:27", "19:29", "19:34", "19:39", "19:47", "20:00", "20:20", "20:40", "21:00", "21:15", "21:30", "21:45", "21:50*", "21:55", "22:00", "22:06", "22:10", "22:15", "22:15*", "22:20", "22:28", "22:30*", "22:35", "22:45", "23:10*"]
      },
      "Sábado": {
        "Manhã": ["6:15", "6:30", "6:45", "7:00", "7:20", "7:40", "8:00", "8:05", "8:15", "8:25", "8:35", "8:45", "9:00", "9:20", "9:40", "10:00", "10:20", "10:40", "11:00", "11:15", "11:30", "11:45", "12:00", "12:15", "12:30"],
        "Tarde": ["13:00", "13:30", "14:00", "14:30", "15:10", "15:30", "16:10", "16:45", "17:10", "17:30"]
      }
    };

    return circularHorarios;
  }

  function getCircularInfoByHour(size, weekend, timeChoosen) {
    var circularHorarios = getCircularInfo();

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
