import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import { Breadcrumb } from 'antd'

const breadcrumbNameMap = {
    '/myblog': '主页',
    '/myblog/article': '博文管理',
    '/myblog/article/publish': '发布文章',
    '/myblog/article/list': '我的发布'
}

export class MyBlogBreadCrumb extends Component {
    render() {
        const { location } = this.props
        const pathSnippets = location.pathname.split('/').filter(i => i)
        const breadcrumbItems = pathSnippets.map((_, index) => {
            const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
            return (
                <Breadcrumb.Item key={url}>                    
                    {breadcrumbNameMap[url]}                    
                </Breadcrumb.Item>
            )
        })        

        return (
            <Breadcrumb separator=">" style={{ margin: '16px 0' }}>
                {breadcrumbItems}
            </Breadcrumb>
        )
    }
}

export default withRouter(MyBlogBreadCrumb)