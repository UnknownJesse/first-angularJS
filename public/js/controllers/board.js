myApp.controller('BoardController',
  ['$scope', '$rootScope','$firebaseAuth', '$firebaseArray',
  function($scope, $rootScope, $firebaseAuth, $firebaseArray) {

    var ref = firebase.database().ref();
    var auth = $firebaseAuth();

    var itemsRef = ref.child('items');
    var itemsInfo = $firebaseArray(itemsRef);

    var statusOrder = ['to_do', 'in_progress', 'fixed', 'complete'];
    var statusOrderPretty = ['To Do', 'In Progress', 'Fixed', 'Complete'];

    $scope.items = itemsInfo;
    $scope.sortOptions = 'date';
    $scope.statusOrder = statusOrder;
    $scope.statusOrderPretty = statusOrderPretty;

    // Add new item to db.
    $scope.addItem = function() {
      itemsInfo.$add({
        name: $scope.itemname,
        status: 'to_do',
        date: firebase.database.ServerValue.TIMESTAMP
      }).then(function() {
        $scope.itemname='';
      });
    } //addItem

    // Delete item from db.
    $scope.deleteItem = function(key) {
      itemsInfo.$remove(key);
    } //deleteMeeting

    // Move item to previous or next column on the board.
    $scope.moveItem = function(key, newCode) {
      itemsInfo[key].status = statusOrder[newCode];
      itemsInfo.$save(key).then(function(ref) {
        ref.key === itemsInfo[key].$id; // true
      });
    } //moveItem

    // Sorts items A-Z, Z-A, Old-new, or New-old.
    $scope.sortItems = function(property) {
        var sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }

        $scope.items = $scope.items.sort(function(a, b){var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;});
    } //sortItems
}]);
