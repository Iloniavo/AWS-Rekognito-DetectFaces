
const getPosition = (e: any, dataList: any[])=>{
//Make calculation on the proportions compared to the data given by AWS
    const newTop = ((e.currentTarget.clientHeight * dataList[0].BoundingBox.Top))
    const newLeft = ((e.currentTarget.clientWidth * dataList[0].BoundingBox.Left))
    const newWidth = (e.currentTarget.clientWidth * dataList[0].BoundingBox.Width)
    const newHeight = (e.currentTarget.clientHeight * dataList[0].BoundingBox.Height)

//Assign new values to face frame
    document.documentElement.style.setProperty('--width', newWidth+"px");
    document.documentElement.style.setProperty('--height', newHeight+"px");
    document.documentElement.style.setProperty('--left', newLeft+"px");
    document.documentElement.style.setProperty('--top', newTop+"px");
}

export default getPosition;