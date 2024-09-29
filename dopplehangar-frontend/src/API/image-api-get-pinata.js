export const getImagePinata = async (cid) => {

    const response = await fetch(`httpa://gateway.pinata.cloud/ipfs/${cid}`);

    if(!response.ok){
        throw new Error('network response was not ok');
    }

    return response.blob();
}
