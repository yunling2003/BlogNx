import * as API from '../api'

export async function prepareWeixinShare(shareObj) {
    var retObj = await API.getWeixinSignature(shareObj.url)

    if(retObj.data && retObj.data.share) {
        wx.config({
            debug: false, 
            appId: retObj.data.share.appId, 
            timestamp: retObj.data.share.timestamp, 
            nonceStr: retObj.data.share.nonceStr, 
            signature: retObj.data.share.signature,
            jsApiList: [
                'updateAppMessageShareData',
                'updateTimelineShareData'
            ] 
        })
    
        wx.ready(function() {       
            wx.updateAppMessageShareData({ 
                title: shareObj.title,
                desc: shareObj.desc,
                link: shareObj.url,
                imgUrl: 'https://www.blognx.com/favicon.ico',
                success: function () {
                    if(shareObj.successCallback && typeof shareObj.successCallback === 'function') {
                        shareObj.successCallback()
                    }
                }
            })
            wx.updateTimelineShareData({ 
                title: shareObj.title,
                desc: shareObj.desc,
                link: shareObj.url,
                imgUrl: 'https://www.blognx.com/favicon.ico',
                success: function () {
                    if(shareObj.successCallback && typeof shareObj.successCallback === 'function') {
                        shareObj.successCallback()
                    }
                }
            })
        })
    
        wx.error(function (res) {
            console.log(res.errMsg)
            if(shareObj.errorCallback && typeof shareObj.errorCallback === 'function') {
                shareObj.errorCallback()
            }
        })
    }    
}