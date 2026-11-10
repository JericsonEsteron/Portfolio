export async function decodePlayableSource(encodedSource) {
  if (!('DecompressionStream' in window)) {
    throw new Error('This browser does not support compressed playable ads.')
  }

  const binary = atob(encodedSource)
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0))
  const compressedStream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))
  return new Response(compressedStream).text()
}
