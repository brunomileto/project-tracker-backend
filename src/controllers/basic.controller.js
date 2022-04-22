function getResponseObj(success, data) {
  if (success) {
    return {status: 200, success: success, message: "Sucesso!", data: data}
  } else {
    return {status: 400, success: success, message: "Ocorreu um problema", data: {}}
  }
}

module.exports = {getResponseObj};