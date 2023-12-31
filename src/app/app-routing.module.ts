import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/auth/admin.guard';
import { NormalGuard } from './services/auth/normal.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { ViewQuizQuestionsComponent } from './pages/admin/view-quiz-questions/view-quiz-questions.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { StartQuizComponent } from './pages/user/start-quiz/start-quiz.component';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: HomeComponent
  },
  {
    path: "signup",
    pathMatch: "full",
    component: SignupComponent
  },
  {
    path: "login",
    pathMatch: "full",
    component: LoginComponent
  },
  {
    path: "admin",
    // pathMatch: "full",     // if you use children then do not use pathMatch
    canActivate: [AdminGuard],
    component: DashboardComponent,
    children:[
      {
        path:"",
        component: WelcomeComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'categories',
        component: ViewCategoriesComponent
      },
      {
        path: 'add-category',
        component: AddCategoryComponent
      },
      {
        path: 'quizzes',
        component: ViewQuizzesComponent
      },
      {
        path: 'add-quiz',
        component: AddQuizComponent
      },
      {
        path: 'add-quiz/:qid',
        component: AddQuizComponent
      },
      {
        path: 'view-questions/:qId/:qTitle',
        component: ViewQuizQuestionsComponent
      },
      {
        path: 'add-question/:qId/:qTitle',
        component: AddQuestionComponent
      }
    ]
  },
  {
    path: "user-dashboard",
    canActivate: [NormalGuard],
    component: UserDashboardComponent,
    children: [
      {
        path:':catId',
        component:LoadQuizComponent
      }, 
      {
        path:'instructions/:qId',
        component:InstructionsComponent
      }
    ]
  },
  {
    path:'start-quiz/:qId',
    canActivate: [NormalGuard],
    component:StartQuizComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
