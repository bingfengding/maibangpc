import request from '@/utils/request'

export function getMembersList() { //员工列表
    return request({
        url: "/pc_seller/staff/mystaff",
        method: 'get'
    })
}

export function getDepartmentsList() { //部门列表
    return request({
        url: "/pc_seller/staff/departments",
        method: 'get'
    })
}

export function createStaff(data) { //添加员工
    return request({
        url: "/pc_seller/staff/addstaff",
        method: 'post',
        data: {
            ...data
        }
    })
}

export function deleteStaff(data) { //删除员工
    return request({
        url: "/pc_seller/staff/deleteStaff",
        method: 'post',
        data: {
            ...data
        }
    })
}

export function updateStaff(data) { //编辑员工
    return request({
        url: "/pc_seller/staff/editStaff",
        method: 'post',
        data: {
            ...data
        }
    })
}

export function staffdetails(data) { //员工详情
    return request({
        url: "/pc_seller/staff/staffdetails",
        method: 'post',
        data: {
            ...data
        }
    })
}

export function stopStaff(data) { //停用员工
    return request({
        url: "/pc_seller/staff/stopsaleman",
        method: 'post',
        data: {
            ...data
        }
    })
}


export function verifyCode(data) { //发送验证码
    return request({
        url: "/pc_seller/staff/verifyCode",
        method: 'post',
        data: {
            ...data
        }
    })
}

export function updateVerifyCode(data) { //修改手机号 发送验证码
    return request({
        url: "/pc_seller/staff/changePhoneVerifyCode",
        method: 'post',
        data: {
            ...data
        }
    })
}

export function permissions() { //权限列表
    return request({
        url: "/pc_seller/staff/permissions",
        method: 'get'
    })
}

export function createDepartment(data) { //创建部门
    return request({
        url: "/pc_seller/staff/createDepartment",
        method: 'post',
        data: {
            ...data
        }
    })
}

export function updateDepartment(data) { //修改部门
    return request({
        url: "/pc_seller/staff/editDepartment",
        method: 'post',
        data: {
            ...data
        }
    })
}

export function deleteDepartment(data) { //删除部门
    return request({
        url: "/pc_seller/staff/deleteDepartment",
        method: 'post',
        data: {
            ...data
        }
    })
}

export function getDepartmentStaff(data) { //部门员工列表
    return request({
        url: "/pc_seller/staff/departmentStaffs",
        method: 'get',
        params: {
            ...data
        }
    })
}

export function staffcard(data) { //成员名片
    return request({
        url: "/pc_seller/staff/staffcard",
        method: 'post',
        data: {
            ...data
        }
    })
}

export function changeStaffsDepartment(data) { //成员名片
    return request({
        url: "/pc_seller/staff/changeStaffsDepartment",
        method: 'post',
        data: {
            ...data
        }
    })
}
