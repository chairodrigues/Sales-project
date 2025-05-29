export const toBase64 = (file, asText) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.onerror = (error) => reject(error)
		reader.onload = () => {
			return asText
				? resolve(reader.result)
				: resolve(window.btoa(reader.result))
		}
		if (asText) {
			reader.readAsText()
		} else {
			reader.readAsBinaryString(file)
		}
	})
}