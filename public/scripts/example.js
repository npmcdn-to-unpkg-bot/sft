var Standard = React.createClass({
    render: function () {
        return (
            <div className="standard">
                <div><i className="standardscoringCategoryName">
                    {this.props.scoringCategoryName}
                </i></div>
                <span>{this.props.name}</span>
            </div>
        );
    }
});

var StandardBox = React.createClass({
    getInitialState: function () {
        return {data: this.props.data};
    },
    render: function () {
        return (
            <div className="standardBox">
                <h1>Standards</h1>
                <h5>Standard Number: {this.state.data.length}</h5>
                <StandardList data={this.state.data}/>
            </div>
        );
    }
});

var StandardList = React.createClass({
    render: function () {
        var standardNodes = this.props.data.map(function (standard) {
            return (
                <Standard scoringCategoryName={standard.scoringCategoryName} key={standard.id} name={standard.name}>
                </Standard>
            );
        });
        return (
            <div className="standardList">
                {standardNodes}
            </div>
        );
    }
});

function getStandardNumber() {
    return isNaN(parseInt($('#standardNumber').val()))
        ? 1000
        : parseInt($('#standardNumber').val());
}

function getData(sn) {
    return $.ajax({
        url: "/api/standards",
        dataType: 'json',
        cache: false
    }).then(function(data) {
        var standardTmpl = data[0];
        var newData = [];
        for (var i = 0; i < sn; i++) {
            newData.push({
                id: standardTmpl.id + i,
                name: standardTmpl.name + ' ' + i,
                scoringCategoryName: standardTmpl.scoringCategoryName + ' ' + i
            });
        }
        return newData;
    });
}

function renderStandardList(data, el) {
    ReactDOM.render(
        <StandardBox data={data} />,
        el
    );
}

$("#run").on("click", function () {

    var $content = $('#content');
    $content.empty();
    var sn = getStandardNumber();

    getData(sn).then(function(data) {
        var startDate = new Date();
        renderStandardList(data, $content[0]);
        $("#time").text((new Date() - startDate) + " ms");
    });

});


