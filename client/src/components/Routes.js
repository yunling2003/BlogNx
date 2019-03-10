import VisibleArticleList from './article/VisibleArticleList'
import ArticleDetail from './article/ArticleDetail'
import LoginForm from './auth/LoginForm'
import RegisterForm from './auth/RegisterForm'
import RegisterResult from './auth/RegisterResult'
import ArticleList from './myblog/ArticleList'
import PublishArticle from './myblog/PublishArticle'
import EditArticle from './myblog/EditArticle'

const Routes = [
    {
        path: '/',
        exact: true,
        component: VisibleArticleList
    },
    {
        path: '/article/:id',
        component: ArticleDetail      
    },
    {
        path: '/login',
        component: LoginForm    
    },
    {
        path: '/register',
        component: RegisterForm    
    },
    {
        path: '/registerresult/:result',
        component: RegisterResult    
    },
    {
        path: '/myblog/article/list',
        component: ArticleList    
    },
    {
        path: '/myblog/article/publish',
        component: PublishArticle    
    },
    {
        path: '/myblog/article/edit/:id',
        component: EditArticle    
    }
  ]
  
  export default Routes