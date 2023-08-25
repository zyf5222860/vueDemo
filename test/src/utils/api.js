import network from './network';
import pyNetwork from './pyNetwork';
import { pyUrl } from './url'
import request from './request';

// 登录
export function login(data) {
  return network({
    url: `/user/login`,
    method: "post",
    data
  });
}

// 注册
export function register(data) {
  return network({
    url: `/user/register`,
    method: "post",
    data
  })
}

// 密码重置
export function resetPwd(data) {
  return network({
    url: `/resetPwd`,
    method: "post",
    data
  })
}

// 任务列表
export function queryTaskList(params) {
  return network({
    url: `/queryTaskList`,
    method: "get",
    params
  })
}

// 添加任务
export function addTask(data) {
  return network({
    url: `/addTask`,
    method: "post",
    data
  })
}

// 编辑任务
export function editTask(data) {
  return network({
    url: `/editTask`,
    method: "put",
    data
  })
}

// 操作任务状态
export function updateTaskStatus(data) {
  return network({
    url: `/updateTaskStatus`,
    method: "put",
    data
  })
}

// 点亮红星标记
export function updateMark(data) {
  return network({
    url: `/updateMark`,
    method: "put",
    data
  })
}

// 删除任务
export function deleteTask(data) {
  return network({
    url: `/deleteTask`,
    method: "delete",
    data
  })
}


// 个人信息查询
export function queryPersonInfo(data) {
  debugger;
  return network({
    url: `/user/username/`+data,
    method: "get",
    data
  })
}

// 保存或更新
export function saveOrUpdate(data) {
  debugger;
  return network({
    url: `/user/saveOrUpdate`,
    method: "post",
    data
  })
}


// 体育信息查询
export function queryTiyuInfo(data) {
  debugger
  return network({
    url: `/info/queryTiyuInfo`,
    method: "post",
    data
  });
}


// python 查询测试
export function queryPyTest(data) {
  debugger
  return pyNetwork({
    url: `/api/query`,
    method: "get",
    data
  });
}