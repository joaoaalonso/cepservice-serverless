export const jsonResponse = (payload: any, statusCode: number = 200) => {
  return {
    statusCode,
    body: JSON.stringify(payload)
  }
}
