<div class="generic-container">
    <div class="panel panel-default">
        <div class="panel-heading">
            <span class="lead">Bike Rental</span></div>
             <div ng-class="{ 'alert': flash, 'alert-success': flash.type === 'success', 'alert-danger': flash.type === 'error' }" ng-if="flash" ng-bind="flash.message"></div>
             <div class="panel-body">
                 &nbsp
                <h3>Login</h3>
                &nbsp
                <form name="form" ng-submit="vm.submit()" role="form">
                    <div class="row">
                    <div class="form-group col-md-12">
                        <label class="control-label col-md-3" for="email">Email:</label>
                        <div class="col-md-9">
                        <input type="text" name="email" id="email" class="form-control" ng-model="vm.user.email" required />
                        </div>
                    </div>
                    </div>
                    &nbsp
                    <div class="row">
                    <div class="form-group col-md-12">
                        <label class="control-label col-md-3" for="password">Password:</label>
                        <div class="col-md-9">
                        <input type="password" name="password" id="password" class="form-control" ng-model="vm.user.password" required />
                        </div>
                    </div>
                    </div>
                    &nbsp
                    <div class="form-actions col-md-12">
                        <button type="submit" class="btn btn-primary">Login</button>
                        <a href="#/register" class="btn btn-link">Register</a>
                    </div>
                </form>
        </div>
    </div>
</div>