class CurrenciesController < ApplicationController

  def index
  end

  def search
    @currencies = Current.where('LOWER(name) LIKE?', "%#{params[:serach].downcase}%")
    render json: { currencies: @currencies }
  end

  # Takes in the currency id and the amount owned
  # returns final calculations
  def calculate
    amount = params[:amount]
    render json: {
      currency: currency,
      current_price: currency.current_price,
      amount: amount,
      value: currency,calculate_value(amount)
    }
  end

  private

  def currency
    @currency = Currency.find(params[:id])
  end
end
