import AsyncStorage from '@react-native-async-storage/async-storage';
export async function setItem(key, value) {
  try {
    await AsyncStorage.setItem(key, value);
    return {msg: '保存成功', status: true};
  } catch (e) {
    console.log(e);
    return {msg: '保存失败', status: false};
  }
}
export async function getItem(key) {
  try {
    let value = await AsyncStorage.getItem(key);
    return {msg: '获取成功', status: true, value};
  } catch (e) {
    console.log(e);
    return {msg: '获取失败', status: false};
  }
}

export async function clear() {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.log(e);
    return {msg: '清理失败', status: false};
  }
}
export async function remove(key) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log(e);
    return {msg: '删除失败', status: false};
  }
}

/**
 * baseurl  服务器基础URL
 */