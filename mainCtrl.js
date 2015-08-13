angular.module('app').controller('mainCtrl', function($scope) {
  var ref = new Firebase("https://katya-story-1.firebaseio.com/");

  $scope.title = "New Story";
  $scope.stories = [];

  ref.child('stories').on("child_added", function(snapShot) {
    var curStory = snapShot.val();

    $scope.stories.push({ key: snapShot.key(), data: curStory});
    console.log('child added:', $scope.stories);
    $scope.$apply();
  })

  $scope.selectStory = function(story) {
    $scope.title = story.data.title;
    $scope.text = story.data.text;
    $scope.curStory = story;
    $scope.newStory = false;
  }

  $scope.createNewStory = function() {
    $scope.title = "Title Here";
    $scope.text = '';
    $scope.newStory = true;
  }

  $scope.save = function(title, text) {

    if($scope.newStory) {
      ref.child('stories').push({
        title: title,
        text: text,
        edited: Date.now()
      })
    } else {
      console.log($scope.curStory.key);
      $scope.curStory.data.title = title;
      $scope.curStory.data.text = text;
      $scope.curStory.data.edited = Date.now();

      ref.child('stories').child($scope.curStory.key).set($scope.curStory.data);
      console.log($scope.stories);
    }
    console.log('you have saved');
  }
})