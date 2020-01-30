document.addEventListener("DOMContentLoaded", function (event) {
    $.ajax({
            type: "GET",
            dataType: 'jsonp',
            // url: 'https://api.meetup.com/2/events?&sign=true&photo-host=public&group_urlname=Code-for-DC&page=20',
            url: 'https://api.meetup.com/Code-for-DC/events?&page=2',
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function () {
                $('#meetup').addClass('loading'); // Show loader icon
            },
            complete: function () {
                $('#meetup').removeClass('loading'); // Hide loader icon
            }
        })
        .done((xhr) => {
            console.log(xhr.data)
            const nextMeetup = xhr.data[0]
            const futureMeetup = xhr.data[1]
            $('#next-meetup-date').html(
              `${moment(nextMeetup.time).format("dddd, MMMM D, YYYY @ h:mm a")}`
            )
            //$('#next-meetup-date').html(
            //    moment(!nextMeetup.time).isSame(moment(), 'day') ?
            //    `${moment(futureMeetup.time).format("dddd, MMMM D, YYYY @ h:mm a")}` :
            //    `Tonight @ ${moment(nextMeetup.time).format('h:mm a')}`
            //)
            $("#next-location").html(
                `
            <a href="https://www.google.com/maps/place/@${nextMeetup.venue.lat},-${nextMeetup.venue.lon},13z" target="_blank">${nextMeetup.venue.address_1}</a>
                `
            )
            $('#next-rsvps').html(nextMeetup.yes_rsvp_count);
            $('#next-rsvp').attr('href', `https://www.meetup.com/Code-for-DC/events/${nextMeetup.id}`);

            if (futureMeetup) {
                $('#future-meetup-date').html(
                    // `${moment(futureMeetup.time).format('DD, MM d, yy')} @ ${moment(futureMeetup.time).format('h:mm')}`
                    `${moment(futureMeetup.time).format("dddd, MMMM D, YYYY @ h:mm a")}`
                )
                $("#future-location").html(
                    `
                        <a href="https://www.google.com/maps/place/@${futureMeetup.venue.lat},-${futureMeetup.venue.lon},13z" target="_blank">${futureMeetup.venue.address_1}</a>
                    `
                )
                $('#future-rsvps').html(futureMeetup.yes_rsvp_count);
                $('#future-rsvp').attr('href', futureMeetup.link);

            } else {
                $('#future-meetup-date').hide();
                $('#future-details').hide();
            }
        });
});
