// constants
var IMAGE_PATH = "images/REPLACE"

// game data
var bankroll = 500000
let bet = 0

var cardTemplate = $("#card-template-dealer")
var dealerHand = $("#dealer-hand").children().eq(0)
var playerHand = $("#player-hand").children().eq(0)

var dealer_score = 0 , player_score = 0
var dealer_hidden_card

var hiddenCard
var hiddenCardValue
var deckCardIndex



$("#deal-btn").click(function(){ 
    $("#deal-btn").attr("disabled", true)
    checkBet()
    first_deal()
    event_deal_dealer()
    event_deal_player()
    event_deal_player()
    checkBlackJack()
})


function randomizeDeck(){
    cardIndex = Math.floor(Math.random() * (deck.length-1)) + 1;
    return cardIndex
}
function event_deal_player(){
    deckCardIndex = randomizeDeck()
    var card = deck[deckCardIndex] 
    if (deckCardIndex > -1){
        deck.splice(deckCardIndex, 1)
    }
    

    player_score += cardValue(card)
    addCard(card, playerHand)
}

function first_deal(){
    deckCardIndex = randomizeDeck()
    var card = deck[deckCardIndex] 
    if(deckCardIndex > -1){
        hiddenCard = deck.splice(deckCardIndex, 1)
    }
    hiddenCardValue = cardValue(card)
    addCard("cardback.png", dealerHand)
}

function event_deal_dealer(){
    deckCardIndex = randomizeDeck()
    var card = deck[deckCardIndex] 
    if (deckCardIndex > -1){
         deck.splice(deckCardIndex, 1) //remove 1 element from deckCardIndex index
    }
   
    dealer_score += cardValue(card)
    addCard(card, dealerHand)
}

function checkBlackJack(){
    if(player_score == 21){
        console.log("Blackjack!!")
        bet = bet * 1.5
        bankroll += +bet
        $("#bankroll").text(bankroll)
        $("#exampleModal").find(".modal-title").text('Blackjack! Player Wins')
        $("#exampleModal").find(".modal-body").text('Won: $' + bet)
        $("#exampleModal").modal('show')
    }
    else if(dealer_score == 21){
        console.log("Blackjack!!")
        bet = bet * 1.5
        bankroll -= +bet
        $("#exampleModal").find(".modal-title").text('Blackjack! Dealer Wins')
        $("#exampleModal").find(".modal-body").text('Lost: $' + bet)
        $("#exampleModal").modal('show')
    }
}

$("#hit-btn").on("click", function(){
    event_deal_player()
    if(player_score > 21){
        bankroll -= +bet
        $("#bankroll").text(bankroll)
        $("#exampleModal").find(".modal-title").text('Player Loses!')
        $("#exampleModal").find(".modal-body").text('Lost: $' + bet)
        $("#exampleModal").modal('show')
        
    }
})


$("#stand-btn").on("click", function(){
    $("#dealer-hand").children().eq(0).remove()
    revealCard(hiddenCard, $("#dealer-hand").children().eq(0))
    dealer_score += hiddenCardValue

    //stand on all 17's
    while(dealer_score < 17){
        event_deal_dealer()
    }
    

    // check dealer score
    if(dealer_score > 21){
        bankroll += +bet
        $("#bankroll").text(bankroll)
        $("#exampleModal").find(".modal-title").text('Dealer Loses!')
        $("#exampleModal").find(".modal-body").text('Won: $' + bet)
        $("#exampleModal").modal('show')
    }
    else if(dealer_score >= 17 && dealer_score <= 21){
        if(dealer_score > player_score){
            bankroll -= +bet
            $("#bankroll").text(bankroll)
            $("#exampleModal").find(".modal-title").text('Dealer Wins!')
            $("#exampleModal").find(".modal-body").text('Lost: $' + bet)
            $("#exampleModal").modal('show')
        }

        else{
            bankroll += +bet
            $("#bankroll").text(bankroll)
            $("#exampleModal").find(".modal-title").text('Dealer Loses!')
            $("#exampleModal").find(".modal-body").text('Won: $' + bet)
            $("#exampleModal").modal('show')
        }
            
    }
        
    else{
        $("#exampleModal").find(".modal-title").text('Tie!')
        $("#exampleModal").modal('show')
    }

})

$("#play-again").on('click', function(){
    location.reload()
})


function image_filename(cardName){
    return IMAGE_PATH.replace("REPLACE", cardName)
}

function checkBet(){
    if($("#deal-amt").val()){
        bet = $("#deal-amt").val()
    }
}
 $("#deal-amt").blur(function(){
    $('#hit-btn').removeAttr('disabled')
    $('#stand-btn').removeAttr('disabled')
    $('#deal-btn').removeAttr('disabled')
})

function addCard(cardName, hand){
    add = cardTemplate.clone()
    add.attr("src", image_filename(cardName))
    add.removeAttr("id")
    add.removeClass("d-none")
    add.insertBefore(hand)
    add.hide().fadeIn(300)
}

function revealCard(cardName, hand){
    add = cardTemplate.clone()
    add.attr("src", image_filename(cardName))
    add.removeAttr("id")
    add.removeClass("d-none")
    add.insertBefore(hand)
    add.hide().fadeIn(300)
}

function cardValue(cardName){
    slice = cardName[0]
    if(slice == 'A') return 11
    if(slice == 'K' || slice == 'Q' ||  slice == 'J' || slice == 'T') return 10
    return parseInt(slice)
}

var deck = []

deck[0] = '2C.png'
deck[1] = '2D.png'
deck[2] = '2H.png'
deck[3] = '2S.png'
deck[4] = '3C.png'
deck[5] = '3D.png'
deck[6] = '3H.png'
deck[7] = '3S.png'
deck[8] = '4C.png'
deck[9] = '4D.png'
deck[10] = '4H.png'
deck[11] = '4S.png'
deck[12] = '5C.png'
deck[13] = '5D.png'
deck[14] = '5H.png'
deck[15] = '5S.png'
deck[16] = '6C.png'
deck[17] = '6D.png'
deck[18] = '6H.png'
deck[19] = '6S.png'
deck[20] = '7C.png'
deck[21] = '7D.png'
deck[22] = '7H.png'
deck[23] = '7S.png'
deck[24] = '8C.png'
deck[25] = '8D.png'
deck[26] = '8H.png'
deck[27] = '8S.png'
deck[28] = '9C.png'
deck[29] = '9D.png'
deck[30] = '9H.png'
deck[31] = '9S.png'
deck[32] = 'AC.png'
deck[33] = 'AD.png'
deck[34] = 'AH.png'
deck[35] = 'AS.png'
deck[36] = 'JC.png'
deck[37] = 'JD.png'
deck[38] = 'JH.png'
deck[39] = 'JS.png'
deck[40] = 'KC.png'
deck[41] = 'KD.png'
deck[42] = 'KH.png'
deck[43] = 'KS.png'
deck[44] = 'QC.png'
deck[45] = 'QD.png'
deck[46] = 'QH.png'
deck[47] = 'QS.png'
deck[48] = 'TC.png'
deck[49] = 'TD.png'
deck[50] = 'TH.png'
deck[51] = 'TS.png'


