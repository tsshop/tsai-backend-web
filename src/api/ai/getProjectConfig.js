import request from '@/utils/request'

export function getSystemInfo(){
    return request({
        url: "/ai/Config/getProjectConfig",
        headers: {
          isToken: false,
          configKey: "background",
        },
    });
}