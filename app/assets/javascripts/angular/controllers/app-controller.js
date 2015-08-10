/**
 * Created by jonybang on 10.07.15.
 */
angular.module('app').controller('AppCtrl', ['$scope', '$location', 'User', 'Organization', 'Forum', 'Person', 'PersonEditor',
    function($scope, $location, User, Organization, Forum, Person, PersonEditor) {
        User.get_person().then(function(result){
            $scope.person = result;
            if(!result.organizations.length)
                return;

            Organization.get(result.organizations[0].id).then(function (organization) {
                $scope.organization = organization;

                if(organization.forums && organization.forums.length)
                    $scope.cur_forum = organization.forums[organization.forums.length - 1];
            });
        });
        $scope.new_forum = {};
        $scope.saveNewForum = function(){
            var forum = new Forum({name: $scope.new_forum.name, organization_id: $scope.organization.id }).create();
            forum.then(function(result){
                $scope.organization.forums.push(result);
                $scope.cur_forum = result;
                $scope.new_forum = {};
            });
        };
        $scope.setCurForum = function(forum){
            $scope.cur_forum = forum;
        };
        $scope.newTeamMember = function(forum, role){
            forum['expand_' + role + 's'] = true;
            
            var inputs = {};
            inputs[role + '_forum_ids'] = [forum.id];

            PersonEditor(inputs).then(function(result){
                if(result.is_new){
                    forum[role + 's'].push(result);
                }
            });
        };
        $scope.tabsData = [
            { route : 'app.events', heading : 'События' },
            { route : '#', heading : 'Материалы', disabled: true },
            { route : '#', heading : 'Чат', disabled: true }
        ];
    }]);