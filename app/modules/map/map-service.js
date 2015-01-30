angular.module('ngScaffoldApp').factory('MapService', [
  'DB', function(DB) {
    var _addItem, _updateItem;
    _addItem = function(item, people, years) {
      var itemSrc, person, selectedPeople, selectedYears, year;
      selectedPeople = [];
      for (person in people) {
        if (people[person]) {
          selectedPeople.push(person);
        }
      }
      selectedYears = [];
      for (year in years) {
        if (years[year]) {
          selectedYears.push(year);
        }
      }
      if (item.node) {
        itemSrc = item.node.src.www;
      }
      return DB.post('items', {
        parent: item.parent,
        url: item.url,
        name: item.name,
        src: itemSrc,
        type: item.type,
        people: selectedPeople,
        years: selectedYears
      });
    };
    _updateItem = function(item, people, years) {
      var itemSrc, person, selectedPeople, selectedYears, year;
      selectedPeople = [];
      for (person in people) {
        if (people[person]) {
          selectedPeople.push(person);
        }
      }
      selectedYears = [];
      for (year in years) {
        if (years[year]) {
          selectedYears.push(year);
        }
      }
      if (item.node) {
        itemSrc = item.node.src.www;
      }
      return DB.put('items', item._id, {
        parent: item.parent,
        url: item.url,
        name: item.name,
        src: itemSrc,
        type: item.type,
        people: selectedPeople,
        years: selectedYears
      });
    };
    return {
      addItem: _addItem,
      updateItem: _updateItem
    };
  }
]);

//# sourceMappingURL=map-service.js.map
