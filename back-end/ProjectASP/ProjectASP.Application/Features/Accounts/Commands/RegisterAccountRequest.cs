using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using ProjectASP.Application.Wrappers;
using ProjectASP.Common.Exceptions;
using ProjectASP.Domain.Entities;
using ProjectASP.Domain.Settings;
using ProjectASP.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace ProjectASP.Application.Features.Accounts.Commands;
public class RegisterAccountRequest : IRequest<RegisterAccountRequest>
{
    [Required(ErrorMessage = "Full Name is required.")]
    [MaxLength(255, ErrorMessage = "Full Name cannot exceed 255 characters.")]
    public string FullName { get; set; }

    [Required(ErrorMessage = "Store Name is required.")]
    [MaxLength(255, ErrorMessage = "Store Name cannot exceed 255 characters.")]
    public string StoreName { get; set; }

    [Required(ErrorMessage = "Email is required.")]
    [MaxLength(255, ErrorMessage = "Email cannot exceed 255 characters.")]
    [EmailAddress(ErrorMessage = "Invalid email address.")]
    public string Email { get; set; }

    public string? PhoneNumber { get; set; }

    [Required(ErrorMessage = "Password is required.")]
    [MinLength(6, ErrorMessage = "Password must be at least 6 characters.")]
    [MaxLength(255, ErrorMessage = "Password cannot exceed 255 characters.")]
    [RegularExpression(@"^(?=.*[!@#$%^&*()])(?=.*[A-Z])(?=.*\d).{6,255}$", ErrorMessage = "Password must contain at least 1 special character: !@#$%^&*(), 1 uppercase character, and 1 number.")]
    public string Password { get; set; }
}

public class RegisterAccountRequestHandler : IRequestHandler<RegisterAccountRequest, RegisterAccountRequest>
{
    private readonly IUnitOfWork _unitOfWork;

    public RegisterAccountRequestHandler(IOptions<AppSettings> appSettings, IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public class RegisterAccountResponse
    {
        public string FullName { get; set; }

        public string Email { get; set; }
    }

    public async Task<RegisterAccountRequest> Handle(RegisterAccountRequest request, CancellationToken cancellationToken)
    {
        ApiResponseModel<RegisterAccountRequest> response = new()
        {
            Data = new()
            {
                FullName = request.FullName,
                Email = request.Email,
            }
        };
        try
        {
            var accounts = await _unitOfWork.Accounts
                .Where(a => a.Username == request.Email)
                .ToListAsync(cancellationToken);

            if (accounts.Count > 0)
            {
                throw new ApiException("Your email was existed");
            }

            Domain.Entities.Store store = new Store()
            {
                AddressId = Guid.Parse("A0000000-0000-0000-0000-000000000001"),
                Logo = "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-sieu-cute-001-1.jpg",
                Title = request.StoreName,
                IsActivated = true,
            };
            await _unitOfWork.Stores.AddAsync(store);

            var hash = (new PasswordHasher<Account>()).HashPassword(null, request.Password);

            Account registerAccountModel = new()
            {
                StoreId = store.Id,
                Username = request.Email,
                Password = hash,
                PhoneNumber = request.PhoneNumber == null ? "" : request.PhoneNumber,
                Thumbnail = "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-sieu-cute-001-1.jpg",
                ValidateCode = "",
                Gender = Domain.Enums.EnumGender.Other,
                FullName = request.FullName
            };

            await _unitOfWork.Accounts.AddAsync(registerAccountModel);

            response.Success = true;

            return response.Data;
        }
        catch (Exception ex)
        {
            throw new ApiException("Your email was existed");
        }
    }
}