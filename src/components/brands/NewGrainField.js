const NewGrainField = () => {
    {grainFieldsArray.map((grainFields, idx) => {
        return (
        <Col  value={`${grainFields.value}`}>
            <InputGroup className="mb-3" key={`${grainFields}-${idx}`}>
                <InputGroup.Prepend>
                    <InputGroup.Text id="basic-newBrandForm">Grain:</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control as="select">
                    <option>Choice 1</option>
                    <option>Rahr - 2 Row</option>
                    <option>Rahr - Pilsner </option>
                    <option>Briess - Crystal 30L</option>
                    <option>Crisp - Crystal 45L</option>
                    <option>Wyerman - Acid Malt</option>
                </Form.Control>
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text id="basic-newBrandForm">Weight:</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control type="text" placeholder="Numbers Only" />
            </InputGroup>
            <button type="button" onClick={() => handleRemove(idx)}>X</button>
        </Col>
        )
        })}
}

export default NewGrainField