import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./components/main-pages/home/home.component";
import {AboutComponent} from "./components/main-pages/about/about.component";
import {NotFoundComponent} from "./components/shared/not-found/not-found.component";
import {UsersComponent} from "./components/main-pages/users/users.component";
import {FlowersComponent} from "./components/main-pages/flowers/flowers.component";
import {BranchesComponent} from "./components/main-pages/branches/branches.component";
import {ModelViewComponent} from "./components/main-pages/model-view/model-view.component";
import {UserModel} from "./model/user-model";
import {FlowerModel} from "./model/flower-model";
import {BranchModel} from "./model/branch-model";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'users', component: ModelViewComponent, data: {modelName:"User", modelType:UserModel, groupByCol:"role"}},
  {path: 'flowers', component: ModelViewComponent, data: {modelName:"Flower", modelType:FlowerModel, groupByCol:"color"}},
  {path: 'branches', component: ModelViewComponent, data: {modelName:"Branch", modelType:BranchModel}},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
