import { articles, articleFilters } from '../../src/reducers/blog'
import { REQUEST_ARTICLES, RECEIVE_ARTICLES, INVALIDATE_ARTICLES, SET_ARTICLEFILTER } from '../../src/actions'

describe('blog reducer', () => {
    it('should return initial empty article', () => {
        expect(articles(undefined, {})).toEqual({})
    })

    it('should handle invalidate articles', () => {
        expect(articles({
            isFetching: false,
            didInvalidate: false,
            totalCount: 0,
            items: []
        }, {
            type: INVALIDATE_ARTICLES
        })).toEqual({
            isFetching: false,
            didInvalidate: true,
            totalCount: 0,
            items: []
        })
    })

    it('should handle request articles', () => {
        expect(articles({
            isFetching: false,
            didInvalidate: true,
            totalCount: 0,
            items: []
        }, {
            type: REQUEST_ARTICLES
        })).toEqual({
            isFetching: true,
            didInvalidate: false,
            totalCount: 0,
            items: []
        })
    })

    it('should handle receive articles', () => {
        expect(articles({
            isFetching: true,
            didInvalidate: false,
            totalCount: 0,
            items: []
        }, {
            type: RECEIVE_ARTICLES,
            totalCount: 1,
            articles: [{'title': 'test title'}]
        })).toEqual({
            isFetching: false,
            didInvalidate: false,
            totalCount: 1,
            items: [{'title': 'test title'}]
        })
    })

    it('should return initial empty article filters', () => {
        expect(articleFilters(undefined, {})).toEqual({})
    })

    it('should handle set article filters', () => {
        expect(articleFilters({            
            page: 0,
            pageSize: 7            
        }, {
            type: SET_ARTICLEFILTER,
            filter: { 
                page: 1, 
                pageSize: 5 
            }
        })).toEqual({
            page: 1, 
            pageSize: 5
        })
    })
})